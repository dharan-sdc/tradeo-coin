package com.sdc.tradeo.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sdc.tradeo.service.CoinService;
import com.sdc.tradeo.model.Coin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class CoinController {
    @Autowired
    private CoinService coinService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    ResponseEntity<List<Coin>>getCoinList(
            @RequestParam(required = false,name="page") int page) throws Exception {
        List<Coin> coins = coinService.getCoinList(page);
        return new ResponseEntity<>(coins, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{coinId}/chart")
    ResponseEntity<JsonNode>getMarketChart(
            @PathVariable String coinId,
            @RequestParam("days") int days) throws Exception {
        String res= coinService.getMarketChart(coinId,days);
        JsonNode jsonNode = objectMapper.readTree(res);
        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<JsonNode> searchCoins(@RequestParam("q") String keyword) throws Exception {
        String res = coinService.searchCoins(keyword);
        JsonNode jsonNode = objectMapper.readTree(res);
        return ResponseEntity.ok(jsonNode);
    }

    @GetMapping("/top-2")
    public ResponseEntity<JsonNode> getTop50CoinsByMarketCapRank() throws Exception {
        String res = coinService.getTop50CoinsByMarketCapRank();
        JsonNode jsonNode = objectMapper.readTree(res);
        return ResponseEntity.ok(jsonNode);
    }

    @GetMapping("/trending")
    public ResponseEntity<JsonNode> getTrendingCoins() throws Exception {
        String res = coinService.getTrendingCoin();
        JsonNode jsonNode = objectMapper.readTree(res);
        return ResponseEntity.ok(jsonNode);
    }
    @GetMapping("/details/{coinId}")
    ResponseEntity<JsonNode> getCoinDetail(
            @PathVariable String coinId) throws Exception {
        String coin= coinService.getCoinDetails(coinId);
        JsonNode jsonNode = objectMapper.readTree(coin);
        return ResponseEntity.ok(jsonNode);
    }
}
