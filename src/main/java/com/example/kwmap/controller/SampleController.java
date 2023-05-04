package com.example.kwmap.controller;

import com.example.kwmap.model.mainPageBuildingsModel;
import com.example.kwmap.service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class SampleController {

    @Autowired
    SampleService sampleService;

    // main 페이지
    @GetMapping("/main")
    public String showMain() {
        System.out.println("@GetMapping(\"/main\")");
        return "index";
    }

    // 전체 건물에 대한 정보를 리스트로 리턴
    @ResponseBody
    @GetMapping("/buildings")
    public List<mainPageBuildingsModel> getBuildings() {
        System.out.println("@GetMapping(\"/main\")");
        List<mainPageBuildingsModel> buildings = sampleService.selectBuildingsList();
        return buildings;
    }

    // 해당 건물에 대한 정보를 리턴
    @ResponseBody
    @GetMapping("/{building}")
    public mainPageBuildingsModel getRoot2(@PathVariable("building") String building) {
        System.out.println("@GetMapping(\"/{building}\")");
        mainPageBuildingsModel info = sampleService.selectBuildingShortInfo(building);
        return info;
    }

    @RequestMapping("/detail")
    public String showDetail(Model model) {
        System.out.println("@RequestMapping(\"/detail\")");
        //System.out.println(sampleService.selectTest());
        //model.addAttribute("arr",sampleService.selectTest());
        return "detail";
    }
}
