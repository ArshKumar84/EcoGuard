package com.academic.EcoGuard.exceptionsHandler;

public class InvalidParametersException extends RuntimeException {

    public InvalidParametersException() {
        super("Invalid Parameters");
    }

    public InvalidParametersException(String message) {
        super(message);
    }
}
