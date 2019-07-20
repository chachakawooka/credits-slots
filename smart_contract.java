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

    private void checkPermission() throws DwSlotsException {
        if (!initiator.equals(owner)) {
            throw new DwSlotsException("403 Permission denied");
        }
    }
    
    private int generateRandomNumber(byte[] seed, int numSymbols) {
        Random random = new Random((long) Arrays.hashCode(seed));
        return random.nextInt(numSymbols);
    }
    
    
    @Getter
    public List<Double> getTopPrizes(int numSymbols, int numReels) {
    	List<Double> Prizes = new ArrayList<>();
    	double tierFund = getTotalOdds(numSymbols, numReels) * 0.7;
    	
    	int numMatched = 0;
    	do {
    		double chances = Math.pow(numSymbols, numReels - ( numMatched + 1) );
    		double prize = (tierFund / Math.pow(2, (numReels - numMatched) )) / chances;
    		
    		Prizes.add(prize);
    		numMatched++;;
    	} while (numMatched < numReels);
    	
    	return Prizes;
    }
    
    @Getter
    public List<Double> getSecondTierPrizes(int numSymbols, int numReels) {
    	List<Double> Prizes = new ArrayList<>();
    	double tierFund = getTotalOdds(numSymbols, numReels) * 0.3;
    	
    	int numMatched = 2;
    	Prizes.add(0.00);
    	Prizes.add(0.00);
    	do {
    		double chances = Math.pow(numSymbols, numReels - ( numMatched + 1) )  * (numSymbols-1);
    		double prize = (tierFund / Math.pow(2, (numReels - numMatched) )) / chances;
    		Prizes.add(prize);
    		numMatched++;;
    	} while (numMatched < numReels);
    	
    	return Prizes;
    }
    
    private double getTotalOdds(int numSymbols, int numReels) {
    	return Math.pow(numSymbols, numReels);
    }
    
    private double calculatePrize(List<Integer> Reels, int numSymbols, int numReels) {    	
    	int i = 0;
    	double prize = 0;
    	
    	
    	//Loop Through second tier prizes;
    	i = 1;
		do {
			if(Reels.get(i).intValue() == Reels.get(i - i).intValue()) {
				prize = getSecondTierPrizes(numSymbols,numReels).get(i);
			}else {
				break;
			}

			i++;
		} while (i < numReels);
    	
    	//Loop Through top tier prizes
    	i = 0;
		do {
			if(Reels.get(i).intValue() == 0) {
				prize = getTopPrizes(numSymbols,numReels).get(i);
			}else {
				break;
			}
			i++;
		} while (i < numReels);
		
    	//
    	return prize;
    }
    
    public String payable(BigDecimal amount, byte[] userData) {

    	/*
    	 * Check Bet levels are valid
    	 */
        double betAmount = amount.doubleValue();
        if (betAmount == 0) {
            return new Response(1, "amount is 0", null).toJson();
        }
        if (betAmount > 5) {
            return new Response(1, "max bet is 5", null).toJson();
        }
        
        
        /*
         * PARSE USER DATA
         */
        String userDataStr = new String(userData, StandardCharsets.UTF_8);
        Response response;
        JsonParser jsonParser = new JsonParser();
        JsonObject jObject = jsonParser.parse(userDataStr).getAsJsonObject();
        int gameHash = jObject.get("gameHash").getAsInt();
        int numSymbols = jObject.get("numSymbols").getAsInt();
        int numReels = jObject.get("numReels").getAsInt();
        String gameMaker = jObject.get("gameMaker").getAsString();

        /*
         * Check the number of reals & symbols aren't zero
         */
        if (numSymbols == 0) {
            return new Response(1, "numSymbols is 0", null).toJson();
        }
        if (numReels == 0) {
            return new Response(1, "numReels is 0", null).toJson();
        } 
        
        byte[] seed = getSeed();
        
       
        
        /*
         * Create some reels
         */
        List<Integer> Reels = new ArrayList<>();
 
        int i = 1;
        do {
        	Reels.add(generateRandomNumber(ArrayUtils.addAll(seed, GeneralConverter.toByteArray(i)),numSymbols));
            i++;
        } while (i <= numReels);

        /*
         * PROGRESSIVE CHANCE
         */
        int progressiveRandom = generateRandomNumber(seed,10000);
        double progressiveJackpot = getProgressiveJackpot();
        if(progressiveJackpot > 10) {
            double progressiveCurve = progressiveJackpot * progressiveJackpot / 10000;
            if(progressiveCurve > progressiveRandom) {
            	sendTransaction(contractAddress, initiator, progressiveJackpot*0.9, transactionFee); //90 % to initiator
            	sendTransaction(contractAddress, gameMaker, progressiveJackpot*0.1, transactionFee); //10 % to game maket
            	
                response = new Response(0, "", new Result(gameHash, true, Reels, progressiveJackpot*0.9));
                String res = response.toJson();
                result.put(initiator, res);
                return res;
            }
        }

        /*
         * Calculate Prize
         */
        boolean resultIsSuccess;
        double multiplier = calculatePrize(Reels,numSymbols,numReels);

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
    public double getProgressiveJackpot() {
    	double balance = getBalance(contractAddress).doubleValue();
    	if(balance < 10) return 0;
    	if(balance > 10000) return balance - 10000; //we try to 10k aside at all times
    	return balance / 10; //on is 10% instead
    }

    public void setTransactionFee(double transactionFee) throws DwSlotsException {
        checkPermission();
        this.transactionFee = transactionFee;
    }

    public void transferAmountToOwner(double amount) throws DwSlotsException {
        checkPermission();
        sendTransaction(contractAddress, owner, amount, transactionFee);
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