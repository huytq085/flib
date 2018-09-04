package com.fsoft.flib.service;

import com.fsoft.flib.domain.TypeEntity;
import com.fsoft.flib.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeServiceImpl implements TypeService {
    private final TypeRepository typeRepository;

    @Autowired
    public TypeServiceImpl(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    @Override
    public List<TypeEntity> getAll() {
        return this.typeRepository.findAll();
    }
}
