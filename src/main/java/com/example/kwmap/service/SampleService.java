package com.example.kwmap.service;

import com.example.kwmap.mapper.SampleMapper;
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
}
