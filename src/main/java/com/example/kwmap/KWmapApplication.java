package com.example.kwmap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

//@SpringBootApplication
//public class KWmapApplication{
//
//    public static void main(String[] args) {
//        SpringApplication.run(KWmapApplication.class, args);
//    }
//
//}

@EnableScheduling
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

@Component
class PythonScriptRunner implements CommandLineRunner {


    @Override
    public void run(String... args) throws Exception {
        executePythonScript();
    }

    @Scheduled(cron = "0 0 0 * * ?")    // 매일 0시 정각에 실행
    private void executePythonScript() {
        try {
            String pythonScriptPath = "src/main/python/dbconn_Test.py";
            /* inheritIO : JVM 프로세스 스트림으로 상속 */
            ProcessBuilder processBuilder = new ProcessBuilder("python3", pythonScriptPath);
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            /* 파이썬에 대한 프로세스가 종료될 때까지 대기 */
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                LocalDateTime now = LocalDateTime.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                String formattedDateTime = now.format(formatter);
                System.out.println("Python 스크립트가 성공적으로 실행되었습니다. 실행 시간: " + formattedDateTime);
            } else {
                System.err.println("Python 스크립트 실행 중 오류가 발생했습니다. 종료 코드: " + exitCode);
            }
        } catch (IOException | InterruptedException e) {
            System.err.println("Python 스크립트 실행 중 예외 발생: " + e.getMessage());
        }
    }

}
