import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  private readonly productName = '.inventory_details_name';

  constructor(page: Page) {
    super(page);
  }

  async getProductName(): Promise<string | null> {
    return await this.page.textContent(this.productName);
  }
}
