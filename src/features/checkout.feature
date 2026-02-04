@checkout
Feature: Checkout functionality
  As a customer of the Swag Labs store
  I want to be able to complete the checkout process
  So that I can receive my ordered items

  Background:
    Given I am logged in as "standard_user"
    And I add "backpack" to the cart
    And I am on the cart page

  @positive @smoke
  Scenario: Successful checkout with all information
    When I click the checkout button
    And I fill in the shipping information
    And I click continue
    And I click finish
    Then I should see the checkout complete message "Thank you for your order!"

  @negative
  Scenario: Error when shipping information is missing
    When I click the checkout button
    And I click continue
    Then I should see a checkout error message "Error: First Name is required"

  @negative @edge
  Scenario: Error when postal code is missing
    When I click the checkout button
    And I fill in firstName and lastName
    And I click continue
    Then I should see a checkout error message "Error: Postal Code is required"

  @negative @skip
  Scenario: Checkout with extremely long names and postal code
    When I click the checkout button
    And I fill in shipping information with very long strings
    And I click continue
    And I click finish
    Then I should see a checkout error message "Error: Input is too long"
