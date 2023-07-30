package com.example.kwmap.model;

import lombok.Data;

@Data
public class mainPageBuildingsModel {
    private String building;
    private String building_code;
    private String building_phone_num;
    private String management_team;
    private String management_team_phone_num;
    private String model_path;
    private Integer position_x;
    private Integer position_y;
    private Integer position_z;
    private Double angle;
    private Integer scale;
    private String others;
    private Double latitude;
    private Double longitude;
}
