package edu.oak.grapitspring.controller.Room;

import edu.oak.grapitspring.domain.Member;
import edu.oak.grapitspring.service.Room.RoomResponseDTO;
import edu.oak.grapitspring.service.Room.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/room")
    public ResponseEntity<List<RoomResponseDTO>> findAllRooms() {
        List<RoomResponseDTO> findAllRoomsResponseDTO = roomService.findAllRooms();
        return ResponseEntity.ok().body(findAllRoomsResponseDTO);
    }

    @PostMapping("/room")
    public ResponseEntity createRoom(@RequestBody CreateRoomRequestDTO request, HttpSession session) {
        log.info("createRoom request: {}", request);
        Member member = (Member) session.getAttribute("member");
        roomService.createRoom(request, member.getMemberId());
        return ResponseEntity.ok().build();
    }

}
