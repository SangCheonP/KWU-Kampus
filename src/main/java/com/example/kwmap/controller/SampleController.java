package com.example.kwmap.controller;

import com.example.kwmap.model.detailBuildingAllRoomsInfoModel;
import com.example.kwmap.model.detailRoomInfoModel;
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

    // 모든 건물에 대한 info 창에 들어갈 정보를 리스트 형태로 리턴
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
    
    // 한 건물의 모드 방에 대한 정보를 리스트로 반환
    @ResponseBody
    @RequestMapping("/detail/info/{building}")
    public List<detailBuildingAllRoomsInfoModel> showDetail(@PathVariable("building") String building, Model model) {
        System.out.println("\"/detail/{building}\"");
        List<detailBuildingAllRoomsInfoModel> info = sampleService.selectDetailBuildingAllRoomsInfo(building);
        return info;
    }
    
    // 건물의 특정 방에 대한 정보 리턴
    @ResponseBody
    @RequestMapping("/detail/info/{building}/{room_code}")
    public detailRoomInfoModel showDetail(@PathVariable("building") String building, @PathVariable("room_code") String room_code, Model model) {
        System.out.println("\"/detail/{building}/{room_code}\"");
        detailRoomInfoModel info = sampleService.selectDetailRoomInfo(building, room_code);
        return info;
    }
}
