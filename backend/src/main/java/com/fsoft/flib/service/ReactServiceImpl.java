package com.fsoft.flib.service;

import com.fsoft.flib.domain.ReactionEntity;
import com.fsoft.flib.domain.ReactionEntityPK;
import com.fsoft.flib.repository.ReactRepository;
import com.fsoft.flib.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class ReactServiceImpl implements ReactService {
    private final ReactRepository reactRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReactServiceImpl(ReactRepository reactRepository, UserRepository userRepository) {
        this.reactRepository = reactRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ReactionEntity create(ReactionEntity reactionEntity, Principal principal) {
        ReactionEntity reactEntiry = reactionEntity;
        int userId = userRepository.findByEmail(principal.getName()).getId();
        reactEntiry.setUserId(userId);
        reactEntiry.setDateAdded(new Timestamp(new Date().getTime()));
        if (this.reactRepository.existsById(new ReactionEntityPK(reactEntiry.getBookId(), userId))) {
            reactEntiry.setDateUpdated(new Timestamp(new Date().getTime()));
        } else {
            reactEntiry.setDateUpdated(reactEntiry.getDateAdded());
        }
        return reactRepository.save(reactionEntity);
    }

    @Override
    public ReactionEntity update(ReactionEntity reactionEntity) {
        return null;
    }

    @Override
    public List<ReactionEntity> getReactsByBookId(int bookId) {
        return reactRepository.findAllByBookId(bookId);
    }
}
