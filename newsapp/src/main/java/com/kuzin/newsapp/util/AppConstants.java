package com.kuzin.newsapp.util;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public interface AppConstants {

    String DEFAULT_PAGE_NUMBER = "0";
    String DEFAULT_PAGE_SIZE = "3";
    int MAX_PAGE_SIZE = 50;

    List<String> SUPPORTED_AVATAR_TYPES = Arrays.asList("image/png", "image/jpeg");
    List<String> SUPPORTED_IMAGE_TYPES = Arrays.asList("image/png", "image/jpeg");
    List<String> SUPPORTED_VIDEO_TYPES = Collections.singletonList("video/mp4");
}
