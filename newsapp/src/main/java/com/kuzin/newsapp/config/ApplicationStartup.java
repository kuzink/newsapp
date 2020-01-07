package com.kuzin.newsapp.config;

import com.kuzin.newsapp.entity.Post;
import com.kuzin.newsapp.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

	@Autowired
	private PostRepository postRepository;

	@Override
	public void onApplicationEvent(final ApplicationReadyEvent event) {
		seedPosts();
	}

	private void seedPosts() {
		/*for (int i = 0; i < 100; i++)
			postRepository.save(new Post("my title" + i, "my text"));*/
	}
}