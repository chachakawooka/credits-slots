import com.credits.general.util.GeneralConverter;
import com.credits.scapi.annotations.Getter;
import com.credits.scapi.v1.SmartContract;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.commons.lang3.ArrayUtils;

import java.io.Serializable;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class DwSlots extends SmartContract {

    private Map<String, String> result = new HashMap<>();
    private String owner;
    private double transactionFee = 0.01;
    private int numReels = 5;

    public DwSlots() {
        super();
        owner = initiator;
    }

    private int generateRandomNumber(byte[] seed) {
        Random random = new Random((long) Arrays.hashCode(seed));
        return random.nextInt(numReels);
    }

    private void checkPermission() throws DwSlotsException {
        if (!initiator.equals(owner)) {
            throw new DwSlotsException("403 Permission denied");
        }
    }

    private int getPrize(List<Integer> Reels) {
        // Total Combinations is 3125

        if ( // 5 CS pays 1000X (1 chance) = 1000
        Reels.get(0).intValue() == 0 && Reels.get(1).intValue() == 0 && Reels.get(2).intValue() == 0
                && Reels.get(3).intValue() == 0 && Reels.get(4).intValue() == 0) {
            return 1000;
        } else if ( // 4 CS pays 200X (5 chance) == 500
        Reels.get(0).intValue() == 0 && Reels.get(1).intValue() == 0 && Reels.get(2).intValue() == 0
                && Reels.get(3).intValue() == 0) {
            return 10;
        } else if ( // 3 CS pays 5X (25 chance) = 250
        Reels.get(0).intValue() == 0 && Reels.get(1).intValue() == 0 && Reels.get(2).intValue() == 0) {
            return 5;
        } else if ( // 2 CS pays 2X (125 chance) = 250
        Reels.get(0).intValue() == 0 && Reels.get(1).intValue() == 0) {
            return 2;
        } else if ( // 1 CS pays 1X (625 chance) = 625
        Reels.get(0).intValue() == 0) {
            return 1;
        } else if ( // ANY 5 pays 50X (4 chance) == 250
        Reels.get(0).intValue() == Reels.get(1).intValue() && Reels.get(1).intValue() == Reels.get(2).intValue()
                && Reels.get(2).intValue() == Reels.get(3).intValue()
                && Reels.get(3).intValue() == Reels.get(4).intValue()) {

        } else if ( // ANY 4 pays 5X (16 chance) == 80
        Reels.get(0).intValue() == Reels.get(1).intValue() && Reels.get(1).intValue() == Reels.get(2).intValue()
                && Reels.get(2).intValue() == Reels.get(3).intValue()
                && Reels.get(3).intValue() == Reels.get(4).intValue()) {
            return 5;
        } else if ( // ANY 3 pays 1X (64 chance) == 64
        Reels.get(0).intValue() == Reels.get(1).intValue() && Reels.get(1).intValue() == Reels.get(2).intValue()
                && Reels.get(2).intValue() == Reels.get(3).intValue()) {
            return 1;
        }
        return 0; // 106 left over as margin
    }

    /**
     * payable
     * 
     * @param amount - bet amount
     * @return result in JSON format, example:
     *         {"code":0,"errorMessage":"","result":{"resultIsSuccess":true,"Reels":[1,2,1],"win":0.0}}
     */
    public String payable(BigDecimal amount, byte[] userData) {

        String userDataStr = new String(userData, StandardCharsets.UTF_8);
        Response response;
        JsonParser jsonParser = new JsonParser();
        JsonObject jObject = jsonParser.parse(userDataStr).getAsJsonObject();
        int gameHash = jObject.get("gameHash").getAsInt();

        List<Integer> Reels = new ArrayList<>();
        byte[] seed = getSeed();

        Reels.add(generateRandomNumber(ArrayUtils.addAll(seed, GeneralConverter.toByteArray(0))));
        Reels.add(generateRandomNumber(ArrayUtils.addAll(seed, GeneralConverter.toByteArray(1))));
        Reels.add(generateRandomNumber(ArrayUtils.addAll(seed, GeneralConverter.toByteArray(2))));
        Reels.add(generateRandomNumber(ArrayUtils.addAll(seed, GeneralConverter.toByteArray(3))));
        Reels.add(generateRandomNumber(ArrayUtils.addAll(seed, GeneralConverter.toByteArray(4))));

        boolean resultIsSuccess;
        int multiplier = getPrize(Reels);

        double win = 0;

        if (multiplier > 0) {
            sendTransaction(contractAddress, initiator, win, transactionFee);
            resultIsSuccess = true;
            win = amount.doubleValue() * multiplier;
        } else {
            resultIsSuccess = false;
        }

        response = new Response(0, "", new Result(gameHash, resultIsSuccess, Reels, win));

        String res = response.toJson();
        result.put(initiator, res);
        return res;
    }

    @Getter
    public double getContractBalance() throws DwSlotsException {
        checkPermission();
        return getBalance(contractAddress).doubleValue();
    }

    public void setTransactionFee(double transactionFee) throws DwSlotsException {
        checkPermission();
        this.transactionFee = transactionFee;
    }

    @Getter
    public double getTransactionFee() {
        return this.transactionFee;
    }

    @Getter
    public String getResult() {
        return result.get(initiator);
    }

    static class Response implements Serializable {
        private int code;
        private String errorMessage;
        private Result result;

        public Response(int code, String errorMessage, Result result) {
            this.code = code;
            this.errorMessage = errorMessage;
            this.result = result;
        }

        public String toJson() {
            Gson gson = new Gson();
            return gson.toJson(this);
        }
    }

    static class Result implements Serializable {
        private int gameHash;
        private boolean resultIsSuccess;
        private List<Integer> Reels;
        private double win;

        public Result(int gameHash, boolean resultIsSuccess, List<Integer> Reels, double win) {
            this.gameHash = gameHash;
            this.resultIsSuccess = resultIsSuccess;
            this.Reels = Reels;
            this.win = win;
        }
    }

    static class DwSlotsException extends Exception {
        public DwSlotsException(String message) {
            super(message);
        }
    }
}