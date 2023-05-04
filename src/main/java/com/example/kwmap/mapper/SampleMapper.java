package com.example.kwmap.mapper;

import com.example.kwmap.model.mainPageBuildingsModel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SampleMapper {
    //@Select("SELECT id FROM member where id = 1")
    public String selectId();
    // testMethod

   public List<mainPageBuildingsModel> selectBuildingsList();

   public mainPageBuildingsModel selectBuildingShortInfo(String building);
}
