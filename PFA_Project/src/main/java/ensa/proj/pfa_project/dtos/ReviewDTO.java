package ensa.proj.pfa_project.dtos;


import lombok.Data;

import java.util.Date;

@Data
public class ReviewDTO {
    private UserDTO userDTO;
    private double rating;
    private String comment;
    private Date createdAt;
}
