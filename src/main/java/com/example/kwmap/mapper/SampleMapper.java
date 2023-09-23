package com.example.kwmap.mapper;

import com.example.kwmap.model.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SampleMapper {

   // 모든 건물에 대한 각각의 모든 정보를 리스트 형태로 리턴
   public List<mainPageBuildingsModel> selectBuildingsList();

   // 해당 건물에 대한 모든 정보를 리턴
   public mainPageBuildingsModel selectBuildingShortInfo(String building_code);

   public detailRoomInfoModel selectDetailRoomInfo(String building_code, String room_code);

   public List<detailBuildingAllRoomsInfoModel> selectDetailBuildingAllRoomsInfo(String building_code);

   public List<detailRoomInfoModel> selectRoomsImportanceDetail(String building_code);


   public buildingLocationModel selectBuildingLocation(String building_code);

   public List<mainPageInfoModel> selectMainPageInfo();
}
