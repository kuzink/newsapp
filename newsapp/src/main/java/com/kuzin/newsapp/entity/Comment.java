package com.kuzin.newsapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.validation.constraints.NotBlank;
import javax.persistence.*;

@Entity
@Table(name = "comments")
public class Comment extends AbstractEntity {

    @Lob
    @NotBlank(message ="Text is required")
    private String text;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false, updatable = false)
    @JsonIgnore
    private Post post;

    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @Transient
    private String userFullName;

    @Transient
    private byte[] userAvatar;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserFullName() {
        return userFullName;
    }

    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }

    public byte[] getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(byte[] userAvatar) {
        this.userAvatar = userAvatar;
    }
}