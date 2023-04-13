package com.example.kwmap.mapper;

import com.example.kwmap.model.mainPageModel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SampleMapper {
    //@Select("SELECT id FROM member where id = 1")
    public Integer selectId();
    // testMethod

   public List<mainPageModel> showAllDataInMainPage();
}
