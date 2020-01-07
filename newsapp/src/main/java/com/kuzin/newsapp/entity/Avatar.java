package com.kuzin.newsapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "avatars")
public class Avatar extends AbstractEntity {

    @Column(name = "ava_uuid")
    private String UUID;

    @NotNull
    @Column(name = "ava_user_id", nullable = false, updatable = false)
    private Long userId;

    public Avatar() {
    }

    public Avatar(String UUID, @NotNull Long userId) {
        this.UUID = UUID;
        this.userId = userId;
    }

    public String getUUID() {
        return UUID;
    }

    public void setUUID(String UUID) {
        this.UUID = UUID;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
