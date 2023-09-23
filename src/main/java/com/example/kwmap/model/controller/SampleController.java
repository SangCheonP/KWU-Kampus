package com.example.kwmap.model.controller;

import com.example.kwmap.model.*;
import com.example.kwmap.service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @GetMapping("/detail")
    public String showDetail() {
        return "detail";
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
    public List<detailBuildingAllRoomsInfoModel> selectDetailBuildingAllRoomsInfo(@PathVariable("building_code") String building_code) {
        System.out.println("\"/detail/info/{building_code}\"");
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

    // 메인화면에서 중요하다 체크된 시설들을 리스트로 가져오는 함수
    @ResponseBody
    @RequestMapping("/building/importanceRooms/info/{building_code}")
    public List<detailRoomInfoModel> showRoomsImportanceDetail(@PathVariable("building_code") String building_code, Model model) {
        System.out.println("\"/building/info/importance/{building_code}\"");
        List<detailRoomInfoModel> info = sampleService.selectRoomsImportanceDetail(building_code);
        return info;
    }

    // 메인 페이지에서 각 건물 모델의 카카오 api에 사용되는 위도와 경도를 가져옴
    @ResponseBody
    @RequestMapping("/building/info/buildingLocation/{building_code}")
    public buildingLocationModel selectBuildingLocation(@PathVariable("building_code") String building_code){
        System.out.println("\"/building/info/buildingLocation/{building_code}\"");
        buildingLocationModel info = sampleService.selectBuildingLocation(building_code);
        return info;
    }

    // main page의 아래 부분에 공지사항에 넣을 모든 정보를 List 형태로 가져옴
    @ResponseBody
    @RequestMapping("/mainpage/info")
    public List<mainPageInfoModel> selectMainPageInfo() {
        System.out.println("\"/mainpage/info\"");
        List<mainPageInfoModel> info = sampleService.selectMainPageInfo();
        return info;
    }
}
