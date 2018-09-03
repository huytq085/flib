package com.fsoft.flib.service;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.ReactionEntity;
import com.fsoft.flib.domain.ReactionEntityPK;
import com.fsoft.flib.repository.BookRepository;
import com.fsoft.flib.repository.ReactRepository;
import com.fsoft.flib.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReactServiceImpl implements ReactService {
    private final ReactRepository reactRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Autowired
    public ReactServiceImpl(ReactRepository reactRepository, UserRepository userRepository, BookRepository bookRepository) {
        this.reactRepository = reactRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
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
        // recalculate rating of book
        Optional<BookEntity> refBook = this.bookRepository.findById(reactEntiry.getBookId());
        if (refBook.isPresent()) {
            double bookRate = refBook.get().getRating();
            int numberOfReact = 1;
            if (refBook.get().getReactionsById().size() == 0) {
                numberOfReact = 1;
            } else {
                numberOfReact = refBook.get().getReactionsById().size();
            }
            double avrRate = ((bookRate * numberOfReact) + reactEntiry.getRating()) / (numberOfReact + 1);
            refBook.get().setRating(Math.round(avrRate));
            bookRepository.save(refBook.get());
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
