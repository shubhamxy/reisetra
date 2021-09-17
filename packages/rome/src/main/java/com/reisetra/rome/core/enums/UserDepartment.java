package com.reisetra.rome.core.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserDepartment {
    COSTING("COSTING"),
    PLACEMENT("PLACEMENT"),
    PRODUCT("PRODUCT"),
    PROCUREMENT("PROCUREMENT");

    private final String value;

    UserDepartment(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
