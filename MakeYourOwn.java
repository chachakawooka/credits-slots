import java.io.Serializable;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.credits.scapi.annotations.Getter;
import com.credits.scapi.v1.SmartContract;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class MakeYourOwn extends SmartContract  {
    private Map<String, Game> games = new HashMap<>();
    private String owner;
    private double transactionFee = 0.01;

    public MakeYourOwn() {
        super();
        owner = initiator;
    }

    private void checkPermission() throws MakeYourOwnException {
        if (!initiator.equals(owner)) {
            throw new MakeYourOwnException("403 Permission denied");
        }
    }


    public void transferAmountToOwner(double amount) throws MakeYourOwnException {
        checkPermission();
        sendTransaction(contractAddress, owner, amount, transactionFee);
    }

    @Getter
    public double getTransactionFee() {
        return this.transactionFee;
    }

    
    public void setTransactionFee(double transactionFee) throws MakeYourOwnException {
        checkPermission();
        this.transactionFee = transactionFee;
    }
    
    public String payable(BigDecimal amount, byte[] userData) {
        
        if(amount.doubleValue() < 1) {
            return "Price is 1CS to create a slot";
        }
        
        String userDataStr = new String(userData, StandardCharsets.UTF_8);
        Response response;
        JsonParser jsonParser = new JsonParser();
        JsonObject jObject = jsonParser.parse(userDataStr).getAsJsonObject();
        int numReels = jObject.get("numReels").getAsInt();
        String name = jObject.get("name").getAsString();
        String symbols = jObject.get("symbols").getAsString();
        String maker = initiator;
        
        
        Game game = new Game(name,numReels,symbols,maker);
        games.put(initiator, game);
        
        response = new Response(0, "", game);

        String res = response.toJson();
        return res;
    }
    
    @Getter
    public String getGames(){
        Gson gson = new Gson();
        return gson.toJson(games);
    }
        
    static class MakeYourOwnException extends Exception {
        public MakeYourOwnException(String message) {
            super(message);
        }
    }
 
    static class Response implements Serializable {
        private int code;
        private String errorMessage;
        private Game game;

        public Response(int code, String errorMessage, Game game) {
            this.code = code;
            this.errorMessage = errorMessage;
            this.game = game;
        }

        public String toJson() {
            Gson gson = new Gson();
            return gson.toJson(this);
        }
    }
    
    static class Game implements Serializable {
        private String name;
        private int numReels;
        private String symbols;
        private String maker;

        public Game(String name, int numReels, String symbols, String maker) {
            this.name = name;
            this.numReels = numReels;
            this.symbols = symbols;
            this.maker = maker;
        }
        
        public String toJson() {
            Gson gson = new Gson();
            return gson.toJson(this);
        }
    }

}
