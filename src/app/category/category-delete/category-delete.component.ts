import { Component } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent {
  // @ts-ignore
  categoryForm: FormGroup;
  // @ts-ignore
  id: number;

  constructor(private categoryService: CategoryService,
              private router: Router,
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

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id);
    this.router.navigate(['/category/list']);
  }
}
