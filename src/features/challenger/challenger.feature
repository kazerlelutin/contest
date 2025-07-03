Feature: Challenger

  Scenario: Create a challenger
    Given I am on the challenger page
    When I fill in the challenger form
    And I click on the create challenger button
    Then I should see the challenger created
