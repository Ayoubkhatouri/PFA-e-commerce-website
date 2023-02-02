package ensa.proj.pfa_project.dtos;


import lombok.Data;

import java.util.Date;

@Data
public class ReviewDTO {
    private Long UserId;
    private String OwnerFirstName;
    private String OwnerLastName;
    private double rating;
    private String comment;
    private Date createdAt;
}
