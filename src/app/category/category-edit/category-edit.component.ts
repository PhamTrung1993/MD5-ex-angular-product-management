import {Component, OnInit} from '@angular/core';
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit{
  // @ts-ignore
  categoryForm: FormGroup;
  // @ts-ignore
  id: number;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      const category = this.getCategory(this.id);
      this.categoryForm = new FormGroup({
        // @ts-ignore
        id: new FormControl(category.id),
        // @ts-ignore
        name: new FormControl(category.name),
      });
    });
  }

  ngOnInit() {
  }

  getCategory(id: number) {
    return this.categoryService.findById(id);
  }

  updateCategory(id: number) {
    const category = this.categoryForm.value;
    this.categoryService.updateCategory(id, category);
    alert('Cập nhật thành công');
  }
}
