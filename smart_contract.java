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

        boolean resultIsSuccess;
        double win = 0;
        double Jackpot = (numReels * numReels) - numReels;

        if (Reels.get(0).intValue() == Reels.get(1).intValue() && Reels.get(1).intValue() == Reels.get(2).intValue()) {
            win = amount.doubleValue() * Jackpot;
            sendTransaction(contractAddress, initiator, win, transactionFee);
            resultIsSuccess = true;
        } else if (Reels.get(0).intValue() == Reels.get(1).intValue()) {
            win = amount.doubleValue(); // return bet
            sendTransaction(contractAddress, initiator, win, transactionFee);
            resultIsSuccess = true;
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