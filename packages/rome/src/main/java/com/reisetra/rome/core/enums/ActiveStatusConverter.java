package com.sitatci.api.enums;

import javax.persistence.AttributeConverter;
import java.util.stream.Stream;

public class ActiveStatusConverter implements AttributeConverter<ActiveStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(ActiveStatus activeStatus) {
        if (null == activeStatus) {
            return null;
        }
        return activeStatus.getValue();
    }

    @Override
    public ActiveStatus convertToEntityAttribute(Integer value) {
        if (null == value) {
            return null;
        }

        return Stream.of(ActiveStatus.values())
                .filter(as -> as.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
