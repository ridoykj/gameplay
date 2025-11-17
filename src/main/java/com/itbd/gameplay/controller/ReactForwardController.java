package com.itbd.gameplay.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Serve ReactJS index.html for all requests that are not relevant for the server.
 */
@Controller
@Slf4j
public class ReactForwardController {
    @GetMapping(path = "{path:^(?!api|public|swagger|assets|content)[^.]*}/**")
    public String handleForward(HttpServletRequest request, HttpServletResponse response, @PathVariable String path) {
        log.info("Request path: {}", request.getServletPath());
        return "forward:/";
    }
}
