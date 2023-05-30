package com.example.kwmap.service;

import com.example.kwmap.mapper.SampleMapper;
import com.example.kwmap.model.detailBuildingAllRoomsInfoModel;
import com.example.kwmap.model.detailRoomInfoModel;
import com.example.kwmap.model.mainPageBuildingsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SampleService {

    @Autowired
    private SampleMapper SampleMapper;

    public String selectTest() {
        return SampleMapper.selectId();
    }

    public List<mainPageBuildingsModel> selectBuildingsList(){
        return SampleMapper.selectBuildingsList();
    }
    public mainPageBuildingsModel selectBuildingShortInfo(String building){
        return SampleMapper.selectBuildingShortInfo(building);
    }

    public detailRoomInfoModel selectDetailRoomInfo(String building, String room_code){
      return SampleMapper.selectDetailRoomInfo(building, room_code);
    }
    // 메인 화면에서 건물 클릭시 간략한 정보 가져오는 기능

    public List<detailBuildingAllRoomsInfoModel> selectDetailBuildingAllRoomsInfo(String building){
        return SampleMapper.selectDetailBuildingAllRoomsInfo(building);
    }
}
