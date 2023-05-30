package com.example.kwmap.model;

import lombok.Data;

@Data
public class detailRoomInfoModel {
    private String building;
    private String floor;
    private String room_no;
    private String building_code;
    private String room_code;
    private String facilities;
    private String category;
    private boolean importance;

}
