package com.ott.job_quest_backend.utils;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;

public class SecretKeyGenerator {
    public static void main(String[] args) throws Exception {

        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
        SecretKey sk = keyGen.generateKey();

        String secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());

        System.out.println("Generated Secret key: " + secretKey);
    }
}
