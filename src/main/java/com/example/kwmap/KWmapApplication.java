package com.example.kwmap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

//@SpringBootApplication
//public class KWmapApplication{
//
//    public static void main(String[] args) {
//        SpringApplication.run(KWmapApplication.class, args);
//    }
//
//}

@SpringBootApplication
public class KWmapApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(KWmapApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(KWmapApplication.class, args);
    }

}
