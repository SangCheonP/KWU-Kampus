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

    // 모든 건물에 대한 각각의 모든 정보를 리스트 형태로 리턴
    @ResponseBody
    @GetMapping("/buildings/info")
    public List<mainPageBuildingsModel> getBuildings() {
        System.out.println("@GetMapping(\"/buildings/info\")");
        List<mainPageBuildingsModel> buildings = sampleService.selectBuildingsList();
        return buildings;
    }

    // 해당 건물에 대한 모든 정보를 리턴
    @ResponseBody
    @GetMapping("/building/info/{building_code}")
    public mainPageBuildingsModel getRoot2(@PathVariable("building_code") String building_code) {
        System.out.println("@GetMapping(\"/{building_code}\")");
        mainPageBuildingsModel info = sampleService.selectBuildingShortInfo(building_code);
        return info;
    }
    
    // 한 건물의 모드 방에 대한 정보를 리스트로 반환
    @ResponseBody
    @RequestMapping("/detail/info/{building_code}")
    public List<detailBuildingAllRoomsInfoModel> showDetail(@PathVariable("building_code") String building_code, Model model) {
        System.out.println("\"/detail/{building_code}\"");
        List<detailBuildingAllRoomsInfoModel> info = sampleService.selectDetailBuildingAllRoomsInfo(building_code);
        return info;
    }
    
    // 건물의 특정 방에 대한 정보 리턴
    @ResponseBody
    @RequestMapping("/detail/info/{building_code}/{room_code}")
    public detailRoomInfoModel showDetail(@PathVariable("building_code") String building_code, @PathVariable("room_code") String room_code, Model model) {
        System.out.println("\"/detail/{building_code}/{room_code}\"");
        detailRoomInfoModel info = sampleService.selectDetailRoomInfo(building_code, room_code);
        return info;
    }
}
