package com.stacktrek.stacktrek.Scraper;

import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScrapeController {
@PostMapping("/scrape")
    public String scrapeDiv(@RequestBody Map<String, String> payload) {
        try {
            Document doc = Jsoup.connect(payload.get("message")).get();
            Element targetDiv = doc.selectFirst("body .container .row.mt-3 .col.col-lg-10 #inner-text");
            return targetDiv != null ? targetDiv.outerHtml() : "Not found";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
