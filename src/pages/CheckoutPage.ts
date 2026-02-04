import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly completeHeader = '[data-test="complete-header"]';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly errorMessage = '[data-test="error"]';

  async clickCheckout(): Promise<void> {
    await this.page.click(this.checkoutButton);
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.page.click(this.continueButton);
  }

  async clickFinish(): Promise<void> {
    await this.page.click(this.finishButton);
  }

  async getConfirmationMessage(): Promise<string | null> {
    return await this.page.textContent(this.completeHeader);
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.page.textContent(this.errorMessage);
  }

  async isCheckoutComplete(): Promise<boolean> {
    return await this.page.isVisible(this.completeHeader);
  }
}
