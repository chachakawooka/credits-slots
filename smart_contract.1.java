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

    public DwSlots() {
        super();
        owner = initiator;
    }

    private int generateRandomNumber(byte[] seed) {
        Random random = new Random((long) Arrays.hashCode(seed));
        return random.nextInt(10) + 1;
    }

    private void checkPermission() throws DwSlotsException {
        if (!initiator.equals(owner)) {
            throw new DwSlotsException("403 Permission denied");
        }
    }

    /**
     * payable
     * @param amount - bet amount
     * @param userData - parameters in JSON format, example:
     *                 {"userNumber":"5","userNumberCount":"4"}
     * @return result in JSON format, example:
     *                  {"code":0,"errorMessage":"","result":{"resultIsSuccess":true,"userNumber":5,"userNumberCount":4,"generatedRandomNumbers":[6,9,5,3],"multiplier":2.5,"winningReward":250.0}}
     */
    public String payable(BigDecimal amount, byte[] userData) {

        if (userData == null || userData.length == 0) {
            return null;
        }
        String userDataStr = new String(userData, StandardCharsets.UTF_8);
        Response response;
        JsonParser jsonParser = new JsonParser();
        JsonObject jObject = jsonParser.parse(userDataStr).getAsJsonObject();
        int userNumber = jObject.get("userNumber").getAsInt();
        int userNumberCount = jObject.get("userNumberCount").getAsInt();

        if (userNumber < 1 || userNumber > 10) {
            return new Response(1, "number must be in 1-10 range", null).toJson();
        }

        double multiplier;
        switch (userNumberCount) {
            case 1: multiplier = 10; break;
            case 2: multiplier = 5; break;
            case 3: multiplier = 3.33; break;
            case 4: multiplier = 2.5; break;
            case 5: multiplier = 2; break;
            default: return new Response(1, "numberCount must be in 1-5 range", null).toJson();
        }

        List<Integer> generatedRandomNumbers = new ArrayList<>();
        byte[] seed = getSeed();
        for(int i = 0; i < userNumberCount; i++) {
            generatedRandomNumbers.add(generateRandomNumber(ArrayUtils.addAll(seed, GeneralConverter.toByteArray(i))));
        }
        boolean resultIsSuccess;
        double winningReward = 0;
        if (generatedRandomNumbers.contains(userNumber)) {
            winningReward = amount.doubleValue() * multiplier;
            sendTransaction(contractAddress, initiator, winningReward, transactionFee);
            resultIsSuccess = true;
        } else {
            resultIsSuccess = false;
        }
        response = new Response(
                0, "",
                new Result(resultIsSuccess, userNumber, userNumberCount, generatedRandomNumbers, multiplier, winningReward)
        );

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
        private boolean resultIsSuccess;
        private int userNumber;
        private int userNumberCount;
        private List<Integer> generatedRandomNumbers;
        private double multiplier;
        private double winningReward;

        public Result(boolean resultIsSuccess, int userNumber, int userNumberCount, List<Integer> generatedRandomNumbers, double multiplier, double winningReward) {
            this.resultIsSuccess = resultIsSuccess;
            this.userNumber = userNumber;
            this.userNumberCount = userNumberCount;
            this.generatedRandomNumbers = generatedRandomNumbers;
            this.multiplier = multiplier;
            this.winningReward = winningReward;
        }
    }

    static class DwSlotsException extends Exception {
        public DwSlotsException(String message) {
            super(message);
        }
    }
}