@products
Feature: Products Inventory
  As a logged-in user of Swag Labs
  I want to interact with the products inventory
  So that I can manage my shopping cart

  Background:
    Given I am logged in as "standard_user"

  @smoke @positive
  Scenario: Verify all products are displayed
    Then I should see 6 products on the page

  @sorting @positive @skip
  Scenario: Sort products by name (Z to A)
    When I sort products by "Name (Z to A)"
    Then the first product should be "red_tshirt"

  @sorting @positive
  Scenario: Sort products by price (low to high)
    When I sort products by "Price (low to high)"
    Then the first product price should be "onesie"

  @sorting @positive
  Scenario: Sort products by price (high to low)
    When I sort products by price high to low
    Then the first product should be "fleece_jacket"

  @positive
  Scenario: Navigate to product detail page
    When I click on the product "backpack"
    Then I should be on the product detail page for "backpack"
