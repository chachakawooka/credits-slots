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
    private int numSymbols = 5;

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

    private double calculatePrize(List<Integer> Reels) {
    	
    	double totalOdds = Math.pow(numSymbols, numReels);
    	int i = numReels;
    	double prize = 0;
    	
    	
    	//Loop Through second tier prizes;
        	double tier1fund = totalOdds * 0.3;
        	i = numReels;
    		do {
    			if(Reels.get((numReels - i) ).intValue() == Reels.get((numReels - i) + 1).intValue()) {
        			double chances = Math.pow(numSymbols, (i - 2) ) * (numSymbols-1);
        			prize = (tier1fund / Math.pow(2, (i-1))) / chances;	
    			}else {
    				break;
    			}

    			i--;
    		} while (i >= 2);
    	
    	//Loop Through top tier prizes
    	double tier0fund = totalOdds * 0.7;
    	i = numReels;
		do {
			if(Reels.get((numReels - i)).intValue() == 0) {
				double chances = Math.pow(numSymbols, (i-1));
				prize = (tier0fund / Math.pow(2, i)) / chances;
			}else {
				break;
			}
			i--;
		} while (i >= 1);
		
    	//
    	return prize;
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

        int i = numReels;
        do {
        	Reels.add(generateRandomNumber(ArrayUtils.addAll(seed, GeneralConverter.toByteArray(i))));
        } while (i <= numReels);

        boolean resultIsSuccess;
        double multiplier = calculatePrize(Reels);

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