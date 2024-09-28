package com.academic.EcoGuard.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExceptionDto {

    private Date timeStamp;

    private String error;

    private HttpStatus status;

//    private String path;


}
