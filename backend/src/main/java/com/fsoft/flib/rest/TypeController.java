package com.fsoft.flib.rest;

import com.fsoft.flib.domain.TypeEntity;
import com.fsoft.flib.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TypeController {
    private final String BASE_URL = "/type";
    private final String GET_ALL_TYPE = BASE_URL + "/all";

    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping(path = GET_ALL_TYPE)
    public List<TypeEntity> getAll() {
        return this.typeService.getAll();
    }


}
