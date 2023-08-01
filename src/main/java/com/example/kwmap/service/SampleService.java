package com.example.kwmap.service;

import com.example.kwmap.mapper.SampleMapper;
import com.example.kwmap.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SampleService {

    @Autowired
    private SampleMapper SampleMapper;

    // 모든 건물에 대한 각각의 모든 정보를 리스트 형태로 리턴
    public List<mainPageBuildingsModel> selectBuildingsList(){
        return SampleMapper.selectBuildingsList();
    }

    // 해당 건물에 대한 모든 정보를 리턴
    public mainPageBuildingsModel selectBuildingShortInfo(String building_code){
        return SampleMapper.selectBuildingShortInfo(building_code);
    }

    public detailRoomInfoModel selectDetailRoomInfo(String building_code, String room_code){
      return SampleMapper.selectDetailRoomInfo(building_code, room_code);
    }
    // 메인 화면에서 건물 클릭시 간략한 정보 가져오는 기능

    public List<detailBuildingAllRoomsInfoModel> selectDetailBuildingAllRoomsInfo(String building_code){
        return SampleMapper.selectDetailBuildingAllRoomsInfo(building_code);
    }

    public List<detailRoomInfoModel> selectRoomsImportanceDetail(String building_code){
        return SampleMapper.selectRoomsImportanceDetail(building_code);
    }

    public List<detailRoomXYModel> selectAllRoomXY(){
        return SampleMapper.selectAllRoomXY();
    }

    public buildingLocationModel selectBuildingLocation(String building_code){
        return SampleMapper.selectBuildingLocation(building_code);
    }
}
