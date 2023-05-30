package com.example.kwmap.model;

import lombok.Data;

@Data
public class detailBuildingAllRoomsInfoModel {
    private String building;
    private String building_code;
    private String building_phone_num;
    private String floor;
    private String room_no;
    private String room_code;
    private String facilities;
    private String category;
    private boolean importance;
}
