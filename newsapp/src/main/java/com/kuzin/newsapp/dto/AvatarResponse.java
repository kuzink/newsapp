package com.kuzin.newsapp.dto;

public class AvatarResponse {

    private byte[] avatar;

    public AvatarResponse() {
    }

    public AvatarResponse(byte[] avatar) {
        this.avatar = avatar;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }
}
