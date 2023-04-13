package com.example.kwmap.controller;

import com.example.kwmap.service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SampleController {

    @Autowired
    SampleService sampleService;

    @RequestMapping("/main")
    public String showMain(Model model) {
        System.out.println("@RequestMapping(\"/main\")");
        System.out.println(sampleService.showAllData());
        model.addAttribute("arr",sampleService.showAllData());
        return "main";
    }

    @RequestMapping("/detail")
    public String showDetail(Model model) {
        System.out.println("@RequestMapping(\"/detail\")");
        //System.out.println(sampleService.selectTest());
        //model.addAttribute("arr",sampleService.selectTest());
        return "detail";
    }

    @RequestMapping("/test")
    public String sampleView(Model model) {
        System.out.println("@RequestMapping(\"/test\")");
        //System.out.println(sampleService.selectTest());
        model.addAttribute("arr",sampleService.selectTest());
        return "test";
    }
}
