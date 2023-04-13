package com.example.kwmap.service;

import com.example.kwmap.mapper.SampleMapper;
import com.example.kwmap.model.mainPageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SampleService {

    @Autowired
    private SampleMapper SampleMapper;

    public Integer selectTest() {
        return SampleMapper.selectId();
    }
    // testMethod

    public List<mainPageModel> showAllData(){
        return SampleMapper.showAllDataInMainPage();
    }
    // mainpage에 모든 data 가져오기
}
