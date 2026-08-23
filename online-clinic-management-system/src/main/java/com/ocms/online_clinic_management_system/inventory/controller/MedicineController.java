package com.ocms.online_clinic_management_system.inventory.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.dto.request.CreateMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.MedicineSearchRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.UpdateMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineDetailResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineResponse;
import com.ocms.online_clinic_management_system.inventory.service.MedicineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
public class MedicineController {

    private final MedicineService medicineService;

    @PatchMapping("/{id}/restore")
    public ResponseEntity<ApiResponse<Void>> restore(@PathVariable Long id) {
        medicineService.restore(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MedicineResponse>> create(@Valid @RequestBody CreateMedicineRequest request) {
        return ResponseEntity.ok(ApiResponse.success(medicineService.create(request)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicineDetailResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(medicineService.getById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<MedicineResponse>>> search(@ParameterObject MedicineSearchRequest request, @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(medicineService.search(request, pageable)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicineResponse>> update(@PathVariable Long id, @Valid @RequestBody UpdateMedicineRequest request) {
        return ResponseEntity.ok(ApiResponse.success(medicineService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        medicineService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}