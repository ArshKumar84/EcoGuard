package com.academic.EcoGuard.dtos;

import java.util.Date;

public class ResponseDto<T> {

    private Date time;

    private boolean status;

    private T response;

}
