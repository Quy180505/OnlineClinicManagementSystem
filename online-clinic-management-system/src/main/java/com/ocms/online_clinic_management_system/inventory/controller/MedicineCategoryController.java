package com.ocms.online_clinic_management_system.inventory.controller;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.dto.request.CreateMedicineCategoryRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.MedicineCategorySearchRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.UpdateMedicineCategoryRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineCategoryResponse;
import com.ocms.online_clinic_management_system.inventory.service.MedicineCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medicine-categories")
@RequiredArgsConstructor
public class MedicineCategoryController {

    private final MedicineCategoryService medicineCategoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<MedicineCategoryResponse>> create(@Valid @RequestBody CreateMedicineCategoryRequest request) {
        return ResponseEntity.ok(ApiResponse.success(medicineCategoryService.create(request)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicineCategoryResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(medicineCategoryService.getById(id)));
    }

    @GetMapping
    public ApiResponse<PageResponse<MedicineCategoryResponse>> search(@RequestParam(required = false) String categoryName, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        MedicineCategorySearchRequest request = new MedicineCategorySearchRequest();
        request.setCategoryName(categoryName);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "categoryName"));

        return ApiResponse.success(medicineCategoryService.search(request, pageable));
    }


    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicineCategoryResponse>> update(@PathVariable Long id, @Valid @RequestBody UpdateMedicineCategoryRequest request) {
        return ResponseEntity.ok(ApiResponse.success(medicineCategoryService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        medicineCategoryService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}