package com.sitatci.api.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ActiveStatus {
    INACTIVE(0),
    ACTIVE(1);

    private final Integer value;

    ActiveStatus(Integer value) {
        this.value = value;
    }

    @JsonValue
    public Integer getValue() {
        return value;
    }
}
